<?php

// returns an associative array of all of the squeaks
function getAllSqueaks() {
  $string = file_get_contents("./data.json");
  return json_decode($string, true)["squeaks"];
}

// returns a single associative array squeak
function getSqueak($squeakId) {
  return getAllSqueaks()[$squeakId];
}

// saves an associative array containing every single squeak
function saveAllSqueaks($squeaks) {
  $fp = fopen('./data.json', 'w');
  fwrite($fp, json_encode(["squeaks" => $squeaks]));
  fclose($fp);
}

// saves a new squeak to the database
function saveNewSqueak($squeak) {
  $squeaks = getAllSqueaks();
  $squeaks[$squeak["id"]] = $squeak;
  saveAllSqueaks($squeaks);
  return $squeak;
}

// updates an existing squeak in the database
function updateSqueak($squeak) {
  $squeaks = getAllSqueaks();
  $squeaks[$squeak["id"]] = $squeak;
  saveAllSqueaks($squeaks);
}

// deletes a single squeak
function deleteSqueak($squeakId) {
  $squeaks = getAllSqueaks();
  unset($squeaks[$squeakId]);
  saveAllSqueaks($squeaks);
}
