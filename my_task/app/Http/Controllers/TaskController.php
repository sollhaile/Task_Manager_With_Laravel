<?php

namespace App\Http\Controllers;
use App\Models\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Response;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $task = Task::all();
       if($task) {
            return  response()->json([
            'status' => 'success',
            'message' => 'Tasks retrieved successfully',
            'data' => $task
        ]);
    } else {
        return response()->json([
            'status'=>'error',
            'message'=>'No tasks found'
        ], Response::HTTP_NOT_FOUND);
    }
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' =>  'required|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'required|boolean',
        ]);
     $task = Task::create($validatedData);
     return response()->json([
        'status' => 'success',
        'message' => 'Task created successfully',
        'data' => $task
     ]);
    }

/**
 * Display the specified resource.
 */
public function show(string $id)
{
    $task = Task::find($id);
    if (!$task) {
        return response()->json([
            'status' => 'error',
            'message' => 'Task not found'
        ], Response::HTTP_NOT_FOUND);
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Task retrieved successfully',
        'data' => $task
    ]);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task =  Task::find($id);
        if (!$task) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], Response::HTTP_NOT_FOUND);   
        }
        else {
            $validatedData = $request->validate([
                'title' =>  'required|string|max:255',
                'description' => 'nullable|string',
                'is_completed' => 'required|boolean',
            ]);
            $task->update($validatedData);
            return response()->json([
                'status' => 'success',
                'message' => 'Task updated successfully',
                'data' => $task
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        if (!$task){
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], Response::HTTP_NOT_FOUND);
        }
        $task->delete();

    return response()->json([
        'status' => 'success',
        'message'=> 'task deleted successfully'

    ]);
    }
}
