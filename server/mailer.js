// // array of user IDs 
// origUserList = [123, 234, 345, 456, 567, 678]; 

// // array of arrays of matched people 
// matchedUserList = [[234, 345], [], [], [], [], []]; 

process.env.MAIL_URL = 'smtp://joannajw:brunchlysendgrid@smtp.sendgrid.net:587';

console.log(Profiles.findOne()); 

var sendEmails = function (origUserList, matchedUserList) { 
    
    var apologySubject = "[Brunchly] Sorry!";
    var apologyBody = "sorry no one likes you";

    for (var i = 0; i < origUserList.length; i++) {

        var emailSubject = apologySubject; 
        var emailBody = apologyBody; 

        if (matchedUserList[0] != null) {
            // Profiles.findOne({userId: Meteor.userId()}
            var userEmail = getEmail(origUserList[i]);
            var matchedBrunchers = []; 

            emailBody = "go eat food with these people!\n\n";
            emailSubject = "[Brunchly] You've been matched!";
            for (var j = 0; j < matchedBrunchers.length; j++) {
                emailBody += getEmail(matchedBrunchers[j]) + "\n"
            }

            Email.send({
                from: "brunch@brunchly.com",
                to: userEmail,
                subject: emailSubject,
                text: emailBody
            });
        }
    }   
}

var getEmail = function(user) {
    return user.email; 
}
