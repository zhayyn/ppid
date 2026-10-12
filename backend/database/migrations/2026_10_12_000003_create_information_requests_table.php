<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('information_requests', function (Blueprint $table): void {
            $table->id();
            $table->string('registration_number')->unique();
            $table->date('submitted_at');
            $table->date('estimated_completed_at');
            $table->string('status')->default('Pendaftaran Diterima')->index();
            $table->string('applicant_category');
            $table->string('full_name');
            $table->string('national_id', 30);
            $table->string('phone', 30);
            $table->string('email');
            $table->text('address');
            $table->string('occupation')->nullable();
            $table->string('information_classification');
            $table->text('information_detail');
            $table->text('purpose');
            $table->string('access_method');
            $table->string('delivery_method');
            $table->unsignedBigInteger('document_id')->nullable();
            $table->text('staff_note')->nullable();
            $table->timestamps();
            $table->index(['national_id', 'email']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('information_requests');
    }
};