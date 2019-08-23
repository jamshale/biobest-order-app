cd C:\Program Files\MongoDB\Server\3.4\bin

mongoexport --host localhost --db testDatabase --collection order --type=csv --fields orderId,customerId,invLocation,shipLocation,finalOrder --out orders.csv
mongoexport --host localhost --db testDatabase --collection customer --type=csv --fields customerId,currentOrders,shipCompany --out customers.csv



cd C:\Users\Admin\Documents\Biobest Order App\batch_vb_files

@echo off
pushd %~dp0
start /b "" cscript test.vbs


pause