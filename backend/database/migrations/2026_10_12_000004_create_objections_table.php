<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('objections', function (Blueprint $table): void {
            $table->id();
            $table->string('objection_number')->unique();
            $table->string('registration_number');
            $table->date('submitted_at');
            $table->string('applicant_name');
            $table->string('national_id', 30);
            $table->string('phone', 30);
            $table->string('email');
            $table->string('reason');
            $table->text('explanation');
            $table->string('status')->default('Diajukan ke Atasan PPID');
            $table->text('supervisor_response')->nullable();
            $table->timestamps();
            $table->index('registration_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('objections');
    }
};