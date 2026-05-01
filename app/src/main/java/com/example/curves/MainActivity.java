package com.example.curves;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.AssetManager;
import android.os.Bundle;

import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;

import android.view.View;

import androidx.core.view.WindowCompat;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.example.curves.databinding.ActivityMainBinding;

import android.view.Menu;
import android.view.MenuItem;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

//    private AppBarConfiguration appBarConfiguration;
//    private ActivityMainBinding binding;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = (WebView) findViewById(R.id.webviev);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("file:///android_asset/modk-add.html");
        webView.loadUrl("javascript:function()");
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);

    }

/*    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        return NavigationUI.navigateUp(navController, appBarConfiguration)
                || super.onSupportNavigateUp();
    }*/
//    private class MyWebViewClient extends WebViewClient {
//    @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
//        return super.shouldOverrideUrlLoading(view, request);
//    }
//
//    @Override public void onPageFinished(WebView view, String url) {
//    }
//
//    @Override
//    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
//        super.onReceivedError(view, request, error);
//    }
//    }
//
//    public static class JavaScriptInterface {
//        Context mContext;
//
//        JavaScriptInterface(Context c) {
//            mContext = c;
//        }
//
//        @JavascriptInterface
//        public void showToast(String toast) {
//            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
//        }
//    }
}
