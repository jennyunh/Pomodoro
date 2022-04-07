# Pomodoro

Pomodoro Clock Default: 25 minutes work session, and 5 minute break.

**Overview:** 

This single page app started as an assignment for a module on FreeCodeCamp.
I decided to take it further and spend time designing the app, and adding in settings features for usability.
This was the first project I coded using a new framework I learned -- React.
I had just learned about class components, and wanted to see how much I can do with this new knowledge.
I loved how I could manage multiple states and mix JS and HTML together all in one component.


**Design Points:** 

This clock is often used by people who want to ensure they get small breaks in between work
sessions. The look of the app should not contribute to the stress of work.
I would only want to use an app like this if the design of it was calming, visually appealing, and simple to
use. This was the goal of this pomodoro app. I selected audio files and researched colour pallettes that were calming.


I thought it'd be nice to have a visual element on the page that would indicate the progress of time
other than the numeric countdown timer. That is why I animated an SVG clock so that the hand goes around in
proportion to the countdown clock. I coded a function that separates the clock's background into two colours (green and yellow) based on the ratio between the set
break time, and the work time. One cycle around the clock is one complete "pomodoro session" (one work and one
        break session).


**Debugging:** 

There is some debugging left to do for this app. Currently, the SVG animation pauses when the tab is not in focus.

In addition, the clock hand does not reset to default position when clicking the reset button.

All of the settings buttons should be disabled when the clock is running.Currently only the apply and default setting buttons are disabled.


See the app in action: https://replit.com/@JennyHwang/Pomodoro#src/App.js


