package com.youscrap;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.cmcewen.blurview.BlurViewPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new BlurViewPackage(),
            new RNViewShotPackage()
        );
    }

    @Nullable
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
