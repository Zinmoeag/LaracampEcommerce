<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function scopeFilter($query, $filter)
    {
        $query = $query->when($filter['search'] ?? false, function($query, $search) {
            $query->where(function($query) use($search) {
                $query->where('name', 'LIKE' ,'%'. $search.'%');
            });
        });

        $query = $query->when($filter['category']??false, function($query, $slug) {
            if(!($slug === 'all')){
                $query->whereHas('category', function($query) use($slug) {
                    $query->where('slug', $slug);
                });
            }
        });

        $query = $query->when($filter['brand']??false, function($query, $slug) {
            if(!($slug === 'all')){
                $query->whereHas('brand', function($query) use($slug) {
                    $query->where('slug', $slug);
                });
            }
        });

    }

    public function category()
    {
        return $this->belongsTo(category::class);
    }

    public function brand()
    {
        return $this->belongsTo(brand::class);
    }

    public function order()
    {
        return $this->belongsTo(order::class);
    }
}
