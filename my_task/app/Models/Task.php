<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{




    protected $table = 'task'; // Explicitly set table name
            
    public $timestamps = false;

    protected $fillable = [
                    'title',
                    'description',
                    'is_completed'
                ];
}
