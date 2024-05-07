<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSongRequest;
use App\Http\Requests\UpdateSongRequest;
use App\Models\Song;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('pages.home');
    }

    public function admin(){
        $songs = Song::all();

        return view('pages.admin', ['songs' => $songs]);
    }

    public function getSongToPlay(){
        $song = Song::where('status', 'play')->first();
        if (!$song) {
            $song = Song::first();
            if ($song){
                $song->status = 'play';
                $song->save();
            }
        }

        return response()->json($song);
    }

    public function deleteSong(Request $request){
        $id = $request->post('id');
        if (is_null($id)){
            $song = Song::where('status', 'play')->first();
            if ($song){
                $song->delete();
            }

            return response()->json(['status' => 'success']);
        }else{
            if (Song::destroy($id)){
                $firstSong = Song::first();
                if ($firstSong){
                    // $firstSong->status = 'play';
                    $firstSong->update([
                        'status' => 'play'
                    ]);
                }

                $songs = Song::all();

                return response()->json(['status' => 'success', 'data' => $songs]);
            }else{
                return response()->json(['status' => 'error', 'data' => []]);
            }

        }
    }



}
