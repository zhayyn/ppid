<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:12'],
        ]);

        $user = User::where('email', $credentials['email'])->where('is_active', true)->first();
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Email atau password salah.'], 401);
        }

        $user->tokens()->delete();
        $token = $user->createToken('ppid-admin', [$user->role])->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => $user->only(['id', 'name', 'email', 'role']),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();
        return response()->json(['message' => 'Sesi berhasil diakhiri.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['admin' => $request->user()->only(['id', 'name', 'email', 'role'])]);
    }
}