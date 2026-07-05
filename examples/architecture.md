# Mimari Koruyucu Uygulama Örneği (Architecture Examples)

Bu belge, `core/architecture.md` altında tanımlanan "Architecture Guardian" (Mimari Koruyucu) kurallarının iyi ve kötü kodlama pratiklerini gösterir.

---

## 1. Katman Sınırlarının Korunması (Layering Boundaries)

*Senaryo*: Sipariş detayı (Order) çekilirken kullanıcının sipariş durumunu güncelleyen bir API ucu eklenmesi isteniyor.

### ❌ Kötü Pratik (Katman Baypası)
Geliştirici, API isteklerini karşılayan Controller sınıfı içinden doğrudan veritabanı Repository katmanını çağırarak işlem yapıyor:

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository; // Hatalı enjeksiyon: Controller doğrudan Repo çağırmamalı

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            
        order.setStatus(status);
        orderRepository.save(order); // Hatalı veritabanı işlemi: Controller içinde DB kaydı yapılmaz
        
        return ResponseEntity.ok().build();
    }
}
```

*Neden Kötü?*: Controller katmanı iş mantığı (business logic) ve veritabanı işlemlerini üstlenerek katmanlı mimari sınırlarını ihlal etti. Kodun test edilebilirliği düştü ve transaction yönetimi baypas edildi.

###  İyi Pratik (Katman Sınırlarına Uyum)
Geliştirici, Controller -> Service -> Repository akışına sadık kalıyor. İş mantığını Service içine alıyor:

**OrderController.java**:
```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService; // Doğru enjeksiyon: Controller sadece Servis çağırır

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestParam String status) {
        orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
```

**OrderServiceImpl.java**:
```java
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository; // Doğru enjeksiyon: Servis Repo çağırır

    @Override
    @Transactional // Transaction yönetimi iş katmanında yapılır
    public void updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new OrderNotFoundException("Sipariş bulunamadı: " + id));
            
        order.setStatus(status);
        orderRepository.save(order);
    }
}
```

---

## 2. DTO ve Entity Ayrımı (Data Transfer Boundaries)

*Senaryo*: Kullanıcı detay bilgilerini getiren bir endpoint yazılması isteniyor.

### ❌ Kötü Pratik (Entity Sızdırma)
Geliştirici, veritabanı tablosu ile eşlenik olan `User` Entity sınıfını doğrudan Controller'dan dışarı dönüyor:

```java
@GetMapping("/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.getUserById(id);
    return ResponseEntity.ok(user); // Kötü: Entity doğrudan dış dünyaya dönülüyor
}
```

*Neden Kötü?*: `User` entity sınıfında kullanıcının şifresi (`password_hash`), salt değeri veya diğer hassas veritabanı kolonları yer alabilir. Entity sızdırmak ciddi bir güvenlik açığı oluşturur ve UI/API kontratını veritabanı şemasına doğrudan bağımlı kılar.

###  İyi Pratik (DTO Kullanımı)
Geliştirici, sadece UI katmanının ihtiyacı olan alanları içeren `UserResponseDTO` nesnesini dönüyor:

```java
@GetMapping("/{id}")
public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id) {
    UserResponseDTO userDto = userService.getUserDtoById(id);
    return ResponseEntity.ok(userDto); // İyi: Sadece güvenli veri taşıyan DTO dönüldü
}
```
