--scriptPath = "./Data/scripts/";
--dofile(scriptPath .. "profileManager.lua");
require "luasql.sqlite3";
require "ex";
profileManagerLoaded = false;
touchdownDirectory = os.currentdir():gsub("\\", "/");
profileManagerPath = touchdownDirectory .. "/Data/Docs/ProfileManager/";
profileManagerIndex = profileManagerPath .. "index.lua";
profileManagerDatabase = profileManagerPath .. "index.db";
profileManagerProfiles = profileManagerPath .. "profiles/";
dofile(profileManagerIndex);

function reloadProfileManager()
	dofile (profileManagerIndex);
	client:send("HTTP/1.1 200 OK\r\n\r\n" .. "<p>reloaded</p>");
end