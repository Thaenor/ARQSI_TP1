<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
        <?php
              
            $dbName= 'i100537';
            $dbHost='localhost';
            $dbUser='i100537';
            $dbPass='6655000';
            
            $mycon= new mysqli($dbHost,$dbUser,$dbPass,$dbName);
            
            if(mysqli_connect_errno()){
                printf("Connected failed: %s \n",  mysqli_connect_error());
            }
            
            $url=$_GET['url'];
            $method=$_GET['method'];
            $limit=$_GET['limit'];
            $day=$_GET['date'];
            $hour=$_GET['hour'];
            
            #o ID está a ser inserido automaticamente.
            $query="INSERT INTO `Information`(`URL`, `Method`, `Limit`, `Time`, `Date`) VALUES ($url,$method,$limit,$day,$hour)";
            $mycon->query($query);
            
            $selQuery = "SELECT * FROM `Information`";
            $recordset = $mycon->query($selQuery);
            
            if($recordset ->num_rows>0){
                while($row= $recordset->fetch_assoc()){
                    echo $row['URL'] ."-". $row['Method']. "-". $row['Limit']; 
                }
            }  
        ?>
    </body>
</html>
