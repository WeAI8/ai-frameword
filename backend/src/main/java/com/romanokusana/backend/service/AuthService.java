package com.romanokusana.backend.service;

import com.romanokusana.backend.dto.AuthRequest;
import com.romanokusana.backend.dto.AuthResponse;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);
    void seedAdminUser();
}
