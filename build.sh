# This script builds the project, The folder name is the project Name  -JR

clear
thisPath=$(pwd)
projectPath=$(awk -F/ '{print $(NF-1)"/"$NF}' <<< $thisPath)
removeChar=${#projectPath}+1
basePath=${thisPath:0:${#thisPath}-removeChar}

#if the above fails, comment out and manually set:
#projectPath="projects/(projectname)"
#basePath="/Users/(user)/Sites/(project directory)"

DATE=$(date +"%m-%d-%y")
TIME=$(date +"%r")
cachebuster=$(date +"%s")

cd $basePath
cp -rf $basePath/$projectPath/Gruntfile.js $basePath/Gruntfile.js
grunt --basePath=$basePath --projectPath=$projectPath --DATE=$DATE --TIME="$TIME" --cachebuster=$cachebuster --gruntfile $basePath/Gruntfile.js
rm -rf $basePath/Gruntfile.js
echo "created file set unique ID: $cachebuster on $DATE at $TIME"
printf "\n>>>cd $thisPath\n"
cd $thisPath
git status

osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload'

read -p "Generic Commit to master? " -n 1 -r
# (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

    cd $thisPath && git add . && git commit -m "auto commit date:$DATE time:$TIME version:$cachebuster" && git push origin master
else
    echo "still have commitment issues?"
fi
