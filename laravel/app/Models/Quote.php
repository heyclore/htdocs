<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;
    protected $table = 'quotes';
    protected $fillable = ['quote', 'author', 'user_id', 'log'];

    public function user()
    {
      return $this->belongsTo(User::class);
    }

    public function ownedBy(User $user)
    {
      return $user->id === $this->user_id;
    }
}
