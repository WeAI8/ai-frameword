package com.romanokusana.backend.service.impl;

import com.romanokusana.backend.dto.AuthRequest;
import com.romanokusana.backend.dto.AuthResponse;
import com.romanokusana.backend.entity.AdminUser;
import com.romanokusana.backend.exception.BadRequestException;
import com.romanokusana.backend.repository.AdminUserRepository;
import com.romanokusana.backend.service.AuthService;
import com.romanokusana.backend.config.JwtTokenProvider;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthServiceImpl(AdminUserRepository adminUserRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider tokenProvider) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(AuthRequest authRequest) {
        AdminUser admin = adminUserRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new BadRequestException("Hatalı kullanıcı adı veya şifre"));

        if (!passwordEncoder.matches(authRequest.getPassword(), admin.getPassword())) {
            throw new BadRequestException("Hatalı kullanıcı adı veya şifre");
        }

        String token = tokenProvider.generateToken(admin.getUsername());
        return new AuthResponse(token, admin.getUsername());
    }

    @Override
    @PostConstruct
    @Transactional
    public void seedAdminUser() {
        if (adminUserRepository.count() == 0) {
            AdminUser admin = new AdminUser();
            admin.setUsername("admin");
            // Seed default admin with "admin123" encrypted password
            admin.setPassword(passwordEncoder.encode("admin123"));
            adminUserRepository.save(admin);
            System.out.println("[INFO] Varsayılan admin kullanıcısı oluşturuldu. Kullanıcı Adı: admin, Şifre: admin123");
        }
    }
}
