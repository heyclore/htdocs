
<div class="mb-2">
  <a href="{{ route('user.quotes', $quote->user) }}" class="foofoo font-weight-bold d-inline text-white">{{ $quote->user->name }}</a>
  <span class="ml-1">{{ $quote->created_at->diffForHumans() }}</span>
  @can('delete', $quote)
    <div class="d-inline float-right ml-1">
      <form action="{{ route('timeline.destroy', $quote) }}" method="post">
        @csrf
        @method('delete')
        <button type="submit" class="bar btn btn-sm bg-white">delete</button>
      </form>
    </div>
  @endcan
  @can('edit', $quote)
    <div class="d-inline float-right ml-1">
      <form action="{{ route('user.quotes.update', ['user' => $quote->user, 'quote' => $quote]) }}" method="post">
        @csrf
        @method('get')
        <button type="submit" class="bar btn btn-sm bg-white">edit</button>
      </form>
    </div>
  @endcan
  <h6 class="font-italic">“{{ $quote->quote }}” - {{ $quote->author}}</h6>
</div>


