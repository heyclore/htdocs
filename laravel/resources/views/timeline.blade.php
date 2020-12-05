@extends('layouts.app')

@section('content')
<div class="container mt-2">
  <div class="col-md-8 p-3 foo mx-auto rounded-lg text-white">
    <h3 class="text-center font-weight-bold"">Post Something</h3>
    <form action="{{ route('timeline') }}" method="post">
      @csrf
      <div class="form-group">
        <label for="quote">Quote</label>
        <input type="text" class="form-control @error('quote') is-invalid @enderror" name="quote" value="{{ old('quote') }}">
        @error('quote')<div class="invalid-feedback text-white">{{ $message }}</div>@enderror
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" class="form-control @error('author') is-invalid @enderror" name="author" value="{{ old('author') }}">
        @error('author')<div class="invalid-feedback text-white">{{ $message }}</div>@enderror
      </div>
        <div class="col text-center">
          <button type="submit" class="btn btn-light bar justify btn-lg">Submit</button>
        </div>
    </form>
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
