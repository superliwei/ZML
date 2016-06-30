set mainDisk=d:
set jar=d:\Blank\labs\temp\ZML\
set appRoot=d:\Blank\labs\temp\ZML\demo\
set releaseDir=bin-release
set indexFile=release.html
%mainDisk%
cd %appRoot%
rmdir %releaseDir% /s/q
md %releaseDir%
copy %indexFile% %releaseDir%
copy chrome.exe.lnk %releaseDir%
xcopy assets %releaseDir%\assets\ /y/s

cd %jar%
java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\Package.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\UserSelectControl.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\Loading.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\Preloader.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\CoreSystem.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\CoreURL.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\CoreEvent.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\Compatible.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\Client.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\Event.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\CanvasEvent.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\MovieClipEvent.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\NavigationEvent.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\Events.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\VideoEvent.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\events\BroadcastCenter.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\AssetsManager.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\ButtonEffectMap.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\ImageAsset.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\BasicCanvas.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\BasicMovieClip.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\Application.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\BasicComponent.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\HtmlCanvas.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\ImageCanvas.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\Button.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\ImageButton.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\Label.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\components\VideoCanvas.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\navigationManagers\transition\None.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\navigationManagers\transition\TransitionMap.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\navigationManagers\NavigationManagerBase.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\navigationManagers\DefaultNavigationManager.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\navigationManagers\BasicNavigationManager.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\NavigationManagerMap.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\NavigationController.js ^
--js %appRoot%%releaseDir%\assets\system\com\blank\core\FactoryMap.js ^
--js_output_file %appRoot%%releaseDir%\assets\system\zml.1.0.min.js

set tmpPlugin=%appRoot%%releaseDir%\assets\system\plugins-\
xcopy %appRoot%%releaseDir%\assets\system\plugins %tmpPlugin% /y/s

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\Alert.js ^
--js_output_file %tmpPlugin%Alert.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\Alpha.js ^
--js_output_file %tmpPlugin%Alpha.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\Eval.js ^
--js_output_file %tmpPlugin%Eval.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\Transform.js ^
--js_output_file %tmpPlugin%Transform.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\Tween.js ^
--js_output_file %tmpPlugin%Tween.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\buttonEffects\Alpha.js ^
--js_output_file %tmpPlugin%buttonEffects\Alpha.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\transitions\Alpha.js ^
--js_output_file %tmpPlugin%transitions\Alpha.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\transitions\Fly.js ^
--js_output_file %tmpPlugin%transitions\Fly.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\transitions\MoveIn.js ^
--js_output_file %tmpPlugin%transitions\MoveIn.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\transitions\Random.js ^
--js_output_file %tmpPlugin%transitions\Random.js

java -jar compiler.jar ^
--js %appRoot%%releaseDir%\assets\system\plugins\transitions\Reverse.js ^
--js_output_file %tmpPlugin%transitions\Reverse.js

rmdir %appRoot%%releaseDir%\assets\system\plugins /s/q
ren %tmpPlugin% plugins
rmdir %appRoot%%releaseDir%\assets\system\com /s/q