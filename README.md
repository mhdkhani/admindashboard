# Responsive open source admin dashboard and control panel based on nodejs and adminlte template.
Currently, this panel is in Farsi and RLT
Installation:
# step 1
Install dependencies
npm i bcrypt bootstrap connect-flash ejs express express-ejs-layouts express-session express-flash body-parser cookie-parser jquery mongodb mongoose
# step 2
isntall package
npm i admindashboardpanel
# step 3
Change the name of the database
db/connect.js
# step 4
Creating the first admin account by executing the command node node_modules/admindashboardpanel/console/create_admin.js
# step 5
Finally, run your program and enter the /adminpanel/login url.
