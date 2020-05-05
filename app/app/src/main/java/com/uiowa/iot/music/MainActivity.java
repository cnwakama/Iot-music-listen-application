package com.uiowa.iot.music;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private Socket mSocket;
    private int count = 0;
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
                            note = data.getString("note");
                            encoded = data.getString("audio");

                            Log.i("Decode", "64 bit string");
                            Log.i("Note", note);
//                            byte[] decoded = Base64.decode(encoded, 0);

//                            File file2 = new File(Environment.getExternalStorageDirectory() + "/hello-5.wav");
//                            FileOutputStream os = new FileOutputStream(file2, true);
//                            os.write(decoded);
//                            os.close();

//                            Utilities.log("~~~~~~~~ Decoded: ", Arrays.toString(decoded));

                            plotNotes(note, count);

                            if (count >= 7) count = 0;
                            else count ++;

                            mSocket.emit("response", "I got you");

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


    public void plotNotes(String note, int count){
        TextView noteText = (TextView) findViewById((R.id.textNote));
        noteText.setText(note);
        noteText.setVisibility(View.VISIBLE);
        ImageView image = (ImageView) findViewById(R.id.imageView);

        System.out.println(count);

        switch(count)
        {
            case 0:
                image = (ImageView) findViewById(R.id.imageView5);
                break;
            case 1:
                image = (ImageView) findViewById(R.id.imageView6);
                break;
            case 2:
                image = (ImageView) findViewById(R.id.imageView7);
                break;
            case 3:
                image = (ImageView) findViewById(R.id.imageView8);
                break;
            case 4:
                image = (ImageView) findViewById(R.id.imageView);
                break;
            case 5:
                image = (ImageView) findViewById(R.id.imageView1);
                break;
            case 6:
                image = (ImageView) findViewById(R.id.imageView2);
                break;
            case 7:
                image = (ImageView) findViewById(R.id.imageView3);
                break;
        }
        if( count >= 4) count -= 4;

        if(note.equals("E")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 165, 386, 27);
            image.setLayoutParams(lp);
        }
        else if(note.equals("F")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 148, 386, 41);
            image.setLayoutParams(lp);
        }
        else if(note.equals("G")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 133, 386, 41);
            image.setLayoutParams(lp);
        }
        else if(note.equals("A")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 111, 386, 41);
            image.setLayoutParams(lp);
        }
        else if(note.equals("B")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 93, 386, 41);
            image.setLayoutParams(lp);
        }
        else if(note.equals("C")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 75, 386, 41);
            image.setLayoutParams(lp);
        }

        else if(note.equals("D")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 57, 386, 41);
            image.setLayoutParams(lp);
        }

        else if(note.equals("EE")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 39, 386, 41);
            image.setLayoutParams(lp);
        }
        else if(note.equals("FF")){
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(image.getLayoutParams());
            if(count > 0 && count < 4) count = 165 * count;
            lp.setMargins(165 + count, 19, 386, 41);
            image.setLayoutParams(lp);
        }

        image.setVisibility(View.VISIBLE);

    }

}
