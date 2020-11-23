# Release Notes version 1.0

NEW FEATURES (Since Sprint 4)

- Added Transaction History page
- Added View Report functionality
- Added link sharing for reports
- Added email sharing for reports
- Added download functionality for reports

BUG FIXES

- Fixed bug with text wrapping that occurred when one word or link was too long
- Tables render in reverse chronological order instead of chronological order now
- Fixed logo on landing page's top left corner

KNOWN BUGS

- Admin's "Edit Users" page UI is not mobile friendly
- Creating a new announcement and not including title or content refreshes the "View Announcements" page
- Cancelling out of creating a new announcement midway still keeps the input in the text boxes
- App sometimes hangs when too many users are accessing the server at once, due to server still being AWS free tier.

# Installation Guide:

Pre-Requisites:

- The only prerequisite to access this application is a working browser on either a computer or a mobile device.

Dependent Libraries:

- For the application itself, only a browser is required, but in order to view downloaded reports, software that can open .csv files is needed, such as a text editor or Microsoft Excel.

Run Instructions:

- To access the application, go to one of the two links provided below (they both lead to the same website):

	http://tinyurl.com/wundergrubs

	http://ec2-18-207-128-58.compute-1.amazonaws.com:3000/

Troubleshooting:

- Once an account is created, it needs to be approved by the administrators at WUNDERgrubs before application access is granted. As a result, users who just registered may not be able to access the application right away.

- Sometimes, if too many people are visiting the site at once, it may hang and data may take longer to load. This is because of the power of the server being used, but WUNDERgrubs has plans to upgrade it in the future. For now, a simple fix would just be to wait a little bit and to refresh the page you are trying to view.
