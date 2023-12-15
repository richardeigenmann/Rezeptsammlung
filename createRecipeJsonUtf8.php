<?php

//  This script creates the file recipesutf8.json
//  Bash:  php createRecipeJsonUtf8.php

$serverRecipeDir = "/richi/Src/Rezeptsammlung/";

class Recipe {
    public $filename;
    public $name;
    public $imageFilename;
    public $width;
    public $height;
    public $categories;
}

// find the recipe files
$recipeFilenamePattern = "/^Rcp\d{3}\.htm$/";
$myDirectory = opendir( $serverRecipeDir );
while ( $entryName = readdir( $myDirectory ) ) {
    if ( preg_match( $recipeFilenamePattern, $entryName ) > 0 ) {
        $dirArray[] = $entryName;
    }
}
closedir( $myDirectory );

sort($dirArray);

// parse the recipes into an array of Recipe objects
$dataPattern = "/<meta.*RCP-|<title>|<img/i";
$titlePattern = "/<title>(?P<title>.*)<\/title>.*/i";
$imgPattern = "/<img src=\"(?P<img>.*)\".*alt=.* width=\"(?P<width>[0-9]+)\".* height=\"(?P<height>[0-9]+)\".*>/i";
$metaPattern = "/<META.*name=\"RCP-(?P<name>.*)\".*content=\"(?P<content>.*)\"/i";

$recipes = array();
foreach ( $dirArray as $filename ) {
    //echo "File: " . $dir . $filename . "<br>";
    $recipe = new Recipe();
    $recipe->filename = $filename;

    $matches = preg_grep( $dataPattern, file( $serverRecipeDir . $filename ) );
    foreach ( $matches as $match ) {
        if ( preg_match($titlePattern, $match, $titleMatchArray ) > 0 ) {
            $recipe->name = html_entity_decode( $titleMatchArray[ 1 ], ENT_QUOTES );
        } elseif ( preg_match( $metaPattern, $match, $metaMatchArray ) > 0) {
            $category = html_entity_decode( $metaMatchArray[ 1 ], ENT_QUOTES );
            if ( !isset( $recipe->categories[ $category ] ) ) {
                $recipe->categories[ $category ] = array();
            }
            array_push($recipe->categories[$category], html_entity_decode( $metaMatchArray[ 2 ], ENT_QUOTES ) );
            // create a numeric index for the stars
            if ($metaMatchArray[ 1 ] == "Bewertung" ) {
                $recipe->stars = substr($metaMatchArray[2],0,1);
            }
        } elseif ( preg_match( $imgPattern, $match, $imgMatchArray ) > 0 ) {
            $recipe->imageFilename = $imgMatchArray[1];
            $recipe->width = $imgMatchArray[2];
            $recipe->height = $imgMatchArray[3];
        }
    }
    array_push( $recipes, $recipe );
}

$myfile = fopen( "recipesutf8.json", "w" ) or die( "Unable to open file!" );
fwrite( $myfile, json_encode( $recipes ) );
fclose( $myfile );
?>
