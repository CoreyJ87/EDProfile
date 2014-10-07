-- any code here will be executed/loaded at startup
-- Use it to run code once or create your own lua functions
-- for later use.

-- 2 test/example functions

---------------------------------------------------------------------------

-- A function that doesn't return any data to the browser
-- To test this function use /function TestFnc() 
-- in the web objects href in your profile
-- This function will execute a program

function TestFnc()

strProgram = '"C:\\Program Files\\Windows Media Player\\wmplayer.exe"';
strCmd = 'start "" '..strProgram;
os.execute(strCmd);

end

---------------------------------------------------------------------------

-- A function that does return data to the browser
-- To test this function use use /Return TestFnc2()
-- in the web objects href in your profile

function TestFnc2()
data = "HTTP/1.1 200 OK\r\n\r\n" .. "<html><head><title>Returned</title></head><body>\n" .. _G["GET"] .. "<br>\n" .. _G["POST"] .. "<br>\n<H1>Touchdown is Awesome</H1></body</html>";
client:send(data);
end

scriptPath = "./Data/scripts/";
dofile(scriptPath .. "profileManager.lua");