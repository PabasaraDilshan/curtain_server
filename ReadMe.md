# New Connection
{
"type":"connect", 
"message":"{"username":"pabasara"   }"
}

{
"type":"connect", 
"message":"Successfully Connected",
"success":"true"
}


Create New Curtain
Request
"{
"type":"add-curtain", 
"message":"{
"username":"pabasara",
"location" : "living room",
"curtainId" : "12345",
"openTime":"",
"closeTime" : ""
   }"
}"

Response
"{
"type":"add-curtain", 
"message": "{
"username":"pabasara",
"location" : "living room",
"curtainId" : "12345",
"openTime":"",
"closeTime" : ""
   }",
"success":"true"
}"







# Get Curtains

Request 
"{
"type":"get-curtains", 
"message":"{
"username":"pabasara"  

 }"
}"

Response
"{
"type":"get-curtains", 
"message":[{
"username":"pabasara",
"location" : "living room",
"curtainId" : "12345",
"openTime":"",
"closeTime" : "" 
 }]
"success":"true"
}"


# Control Curtains
Request 
"{
"type":"control-curtain", 
"message":"{
"username":"pabasara",
"curtainId":"12345",
"command":"open"  

 }"
}"







Response
"{
"type":"control-curtain", 
"message": "Curtain Opened Successfully"
"success":"true"
}"
