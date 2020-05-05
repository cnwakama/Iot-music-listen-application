package com.uiowa.iot.music;

import android.os.Bundle;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URISyntaxException;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private Socket mSocket;

    private String note;
    private String encoded;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        try {
            mSocket = IO.socket("https://glimmer-lying-stoplight.glitch.me");
            mSocket.connect();
            mSocket.emit("join", "Android");

        } catch (URISyntaxException ignored) {}


        mSocket.on("results", new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        JSONObject data = (JSONObject) args[0];
//                        String username;
//                        String message;
                        try {
                            note = data.getString("username");
                            encoded = data.getString("message");

                            Log.i("Decode", "64 bit string");
                            byte[] decoded = Base64.decode(encoded, 0);

                            File file2 = new File(Environment.getExternalStorageDirectory() + "/hello-5.wav");
                            FileOutputStream os = new FileOutputStream(file2, true);
                            os.write(decoded);
                            os.close();

//                            Utilities.log("~~~~~~~~ Decoded: ", Arrays.toString(decoded));

                            Log.i("Note", note);
                            TextView imgView = (TextView)findViewById(R.id.custom);
                            imgView.setVisibility(TextView.VISIBLE);

                        } catch (Exception e) {
                            return;
                        }

                        // add the message to view
//                        addMessage(username, message);
                    }
                });
            }
        });

        mSocket.on("userdisconnect", new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        String data = (String) args[0];

                        Toast.makeText(MainActivity.this,data,Toast.LENGTH_SHORT).show();

                    }
                });
            }
        });
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        mSocket.disconnect();
        mSocket.off("new message",  new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        JSONObject data = (JSONObject) args[0];
                        String username;
                        String message;
                        try {
                            username = data.getString("username");
                            message = data.getString("message");
                        } catch (JSONException e) {
                            return;
                        }

                        // add the message to view
//                        addMessage(username, message);
                    }
                });
            }
        });
    }

}
