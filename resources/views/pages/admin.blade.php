@extends('layouts.app')

@section('content')
    <div class="container mx-auto mt-10 js-admin-container">
        <h1 class="mb-6 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white text-center">Черга пісень</h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto max-w-4xl">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-sky-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Черга
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Користувач
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Назва
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Статус
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Дії
                    </th>
                </tr>
                </thead>
                <tbody>
                @foreach ($songs as $key => $song)
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ $key + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            <span>@</span>{{ $song->username }}
                        </td>
                        <td class="px-6 py-4">
                            <a href="{{ $song->link }}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ $song->name }}</a>
                        </td>
                        <td class="px-6 py-4">
                            @if($song->status === 'hold')
                                <span class="text-orange-400">В черзі</span>
                            @else
                                <span class="text-green-400">Грає</span>
                            @endif
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex">
                                <button type="button" class="_js-remove-song" data-id="{{ $song->id }}">
                                    <svg class="w-6 h-6 text-red-400 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop

