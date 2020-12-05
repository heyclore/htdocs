<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quote;
use Carbon\Carbon;
use Illuminate\Pagination\Paginator;

class TimelineController extends Controller
{
  public function index()
  {
    $data = ([
      'title' => 'Timeline',
      'quotes' => Quote::latest()->with(['user'])->paginate(5),
    ]);
    return view('timeline', $data);
  }

  public function store(Request $request)
  {
    if(!auth()->check())
    {
      return redirect()->route('login');
    }

    $request->validate([
      'author' => 'required',
      'quote' => 'required',
    ]);

    Quote::create([
      'user_id' => auth()->id(),
      'author' => $request->author,
      'quote' => $request->quote,
      'log' => 'laravel'
    ]);
    return back();
  }

  public function destroy(Quote $quote)
  {
//    if(!$quote->ownedBy(auth()->user()))
//    {
//      dd('www');
//    }

    $this->authorize('delete', $quote);
    $quote->delete();
    return back();
  }

}
