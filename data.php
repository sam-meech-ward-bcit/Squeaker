<?php

function getAllSqueaks() {
  $string = file_get_contents("./data.json");
  return json_decode($string, true)["squeaks"];
}

function getSqueak($squeakId) {
  return getAllSqueaks()[$squeakId];
}

function saveAllSqueaks($squeaks) {
  $fp = fopen('./data.json', 'w');
  fwrite($fp, json_encode(["squeaks" => $squeaks]));
  fclose($fp);
}

function saveNewSqueak($squeak) {
  $squeaks = getAllSqueaks();
  $squeaks[$squeak["id"]] = $squeak;
  saveAllSqueaks($squeaks);
  return $squeak;
}

function updateSqueak($squeak) {
  $squeaks = getAllSqueaks();
  $squeaks[$squeak["id"]] = $squeak;
  saveAllSqueaks($squeaks);
}

function deleteSqueak($squeakId) {
  $squeaks = getAllSqueaks();
  unset($squeaks[$squeakId]);
  saveAllSqueaks($squeaks);
}
