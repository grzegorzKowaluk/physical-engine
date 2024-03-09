@echo off

rem Delete www folder
echo Deleting www folder...
rmdir /s /q www

rem Delete pkg folder
echo Deleting pkg folder...
rmdir /s /q pkg

rem Delete target folder
echo Deleting target folder...
rmdir /s /q target

echo Deletion completed.