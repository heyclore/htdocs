<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quote;

class HomeController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    //         $this->middleware('auth');
  }

  /**
   * Show the application dashboard.
   *
   * @return \Illuminate\Contracts\Support\Renderable
   */
  public function index()
  {
    $quotes = Quote::all()->random(1);
    $data = ([
      'title' => 'Random Quotes',
      'quote' => $quotes[0]->quote,
      'author' => $quotes[0]->author,
      'user' => $quotes[0]->user->name,
      'id' => $quotes[0]->user->id,
    ]);
    return view('home', $data);
  }

  public function ajax()
  {
    $quotes = Quote::all()->random(1);

    return response()->json([
      'quote' => $quotes[0]->quote,
      'author' => $quotes[0]->author,
      'user' => $quotes[0]->user->name,
      'id' => $quotes[0]->user->id,
      'link' => route('user.quotes', $quotes[0]->user->name),
    ]);
  }


}

