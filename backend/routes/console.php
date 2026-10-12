<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('ppid:create-admin', function (): void {
    $name = $this->ask('Nama admin');
    $email = $this->ask('Email admin');
    $password = $this->secret('Password minimal 12 karakter');

    if (strlen($password) < 12) {
        $this->error('Password minimal 12 karakter.');
        return;
    }

    $user = \App\Models\User::updateOrCreate(
        ['email' => $email],
        ['name' => $name, 'password' => $password, 'role' => 'admin', 'is_active' => true]
    );
    $user->tokens()->delete();
    $this->info("Admin {$user->email} berhasil dibuat atau diperbarui.");
})->purpose('Create or update the first PPID admin');

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
