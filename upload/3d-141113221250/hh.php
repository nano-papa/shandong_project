<?PHP
    $filename='images/'.$_GET['id'].'.jpg';
    move_uploaded_file($_FILES['file']['tmp_name'], $filename);