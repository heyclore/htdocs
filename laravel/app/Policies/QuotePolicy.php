<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Quote;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuotePolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Quote $quote)
    {
      return $user->id === $quote->user_id;
    }

    public function edit(User $user, Quote $quote)
    {
      return $user->id === $quote->user_id;
    }

    public function update(User $user, Quote $quote)
    {
      return $user->id === $quote->user_id;
    }
}
