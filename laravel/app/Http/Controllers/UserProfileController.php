<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quote;
use App\Models\User;

class UserProfileController extends Controller
{
  public function index(User $user)
  {
    $data = ([
      'title' => $user->name . ' Quote Posts',
      'quotes' => $user->quote()->latest()->with(['user'])->paginate(5),
      'user' => $user,
    ]);

    return view('users.quotes', $data);
  }

  public function edit(User $user, Quote $quote)
  {
    $this->authorize('edit', $quote);

    $data = ([
      'title' => 'Update Post',
      'quotes' => $quote,
    ]);

    return view('users.edit', $data);
  }

  public function update(User $user, Quote $quote, Request $request)
  {
    $this->authorize('update', $quote);

    $request->validate([
      'author' => 'required',
      'quote' => 'required',
    ]);

    Quote::where('id', $quote->id)->update([
      'author' => $request->author,
      'quote' => $request->quote,
    ]);

    return redirect()->route('user.quotes',$user);
  }
}
