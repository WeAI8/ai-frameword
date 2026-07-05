# Mühendislik Felsefesi Uygulama Örnekleri (Philosophy Examples)

Bu belge, `core/philosophy.md` altındaki temel felsefi kuralların iyi (Good Practice) ve kötü (Bad Practice) pratiklerini somut olarak gösterir.

---

## 1. En Küçük Değişiklik Prensibi (Minimal Changes)

*Senaryo*: Kullanıcı, `UserService` içindeki login hatasının loglanması sırasında eksik kalan kullanıcı adı detayının eklenmesini istiyor.

### ❌ Kötü Pratik (Bad Practice)
Geliştirici, sadece log satırını değiştirmek yerine alakasız metodları da temizlemeye ve düzenlemeye çalışıyor:

```diff
- public User login(String username, String password) {
-     User user = userRepository.findByUsername(username);
-     if (user == null) {
-         log.error("Login failed");
-         throw new BadCredentialsException("Invalid username or password");
-     }
-     return user;
- }
- 
- public void deleteUser(Long id) {
-    userRepository.deleteById(id);
- }
+ public User login(String username, String password) {
+     User user = userRepository.findByUsername(username);
+     if (user == null) {
+         log.error("Login failed for user: " + username); // Sadece bu satır istenmişti
+         throw new BadCredentialsException("Invalid username or password");
+     }
+     return user;
+ }
+ 
+ // Fuzuli Refactoring: İstenmediği halde formatı ve isimlendirmeyi değiştiriyor
+ public void deleteUserById(final Long userId) {
+    this.userRepository.deleteById(userId);
+ }
```

*Neden Kötü?*: İstenmeyen değişiklikler git geçmişini kirletir, regresyon (hata) riskini artırır ve kod inceleme (review) sürecini zorlaştırır.

###  İyi Pratik (Good Practice)
Geliştirici sadece talep edilen satırı değiştirip minimal bir diff sunuyor:

```diff
  public User login(String username, String password) {
      User user = userRepository.findByUsername(username);
      if (user == null) {
-         log.error("Login failed");
+         log.error("Login failed for user: " + username);
          throw new BadCredentialsException("Invalid username or password");
      }
      return user;
  }
```

---

## 2. Yeniden Yazmak Yerine Yeniden Kullan (Reuse Over Rewrite)

*Senaryo*: Kullanıcı, sisteme girilen verinin e-posta formatına uygun olup olmadığını kontrol eden bir doğrulama fonksiyonu eklenmesini istiyor.

### ❌ Kötü Pratik (Bad Practice)
Geliştirici, projeyi taramadan doğrudan yeni bir regex yazıp custom validation kuruyor:

```javascript
// Geliştirici sıfırdan yazıyor:
const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
```

*Neden Kötü?*: Projede zaten `src/utils/validators.js` altında `isValidEmail` adında bir fonksiyon olabilir. Mükerrer kod yazmak (code duplication) projenin bakım maliyetini artırır.

###  İyi Pratik (Good Practice)
Geliştirici önce projeyi tarıyor, mevcut `validators.js` dosyasını buluyor ve oradaki fonksiyonu import edip kullanıyor:

```javascript
import { isValidEmail } from 'src/utils/validators';

// Doğrudan mevcut fonksiyonu çağırıyor:
if (!isValidEmail(inputEmail)) {
    throw new ValidationError("Geçersiz e-posta formatı");
}
```
