@extends('layouts.app')

@section('content')
<div class="container mt-2">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card foobar">
                <div class="card-header bar p-5 font-italic">“<span id="quote">{{ $quote }}</span>”</div>
                <div class="card-body foo text-white">
                  <p id="author" class="text-left d-inline">{{ $author }}</p>
                  <span class="float-right">Added By: <a id="user" class="text-white font-weight-bold" href="{{ route('user.quotes', $user) }}">{{ $user }}</a></span>
                </div>
            </div>
            <div class="text-center">
                <button type="button" class="btn mt-5 foo text-white" onclick="foo(this)">Gimme More...!!!</button>
                <!-- <button type="button" class="btn mt-5 bar foobar" onclick="foo()">Gimme More...!!!</button> -->
            </div>
         </div>
    </div>
</div>
@endsection
