@extends('layouts.app')

@section('content')
<div class="container mt-2">
  <div class="col-md-8 p-3 foo mx-auto rounded-lg text-white">
    <h3 class="text-center font-weight-bold"">Update Post</h3>
    <form action="{{ route('user.quotes.update', ['user' => $quotes->user, 'quote' => $quotes]) }}" method="post">
      @csrf
      <div class="form-group">
        <label for="quote">Quote</label>
        <input type="text" class="form-control @error('quote') is-invalid @enderror" name="quote" value="{{ old('quote', $quotes->quote) }}">
        @error('quote')<div class="invalid-feedback text-white">{{ $message }}</div>@enderror
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="text" class="form-control @error('author') is-invalid @enderror" name="author" value="{{ old('author', $quotes->author) }}">
        @error('author')<div class="invalid-feedback text-white">{{ $message }}</div>@enderror
      </div>
        <div class="col text-center">
          <button type="submit" class="btn btn-light bar justify btn-lg">Submit</button>
        </div>
    </form>
  </div>
</div>
@endsection
