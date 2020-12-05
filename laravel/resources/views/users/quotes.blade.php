@extends('layouts.app')

@section('content')
<div class="container mt-4">
  <div class="col-md-8 p-3 foo mx-auto rounded-lg text-white">
    <h1>{{ $user->name }}</h1>
     <p>Posted {{ $quotes->count() }} {{ Str::plural('quote', $quotes->count()) }}</p>
  </div>
</div>
<div class="container mt-4">
  <div class="col-md-8 p-3 foo mx-auto rounded-lg text-white">
      @if ($quotes->count())
        @foreach ($quotes as $quote)
          <x-quote :quote="$quote" />
        @endforeach
      @else
          <p>there's nothing</p>
      @endif
    <div class="col d-flex justify-content-center mt-4">
      {{ $quotes->links() }}
    </div>
  </div>
</div>
@endsection
