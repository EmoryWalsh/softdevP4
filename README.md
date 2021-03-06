# The Happiness Project by JEeBerS

[Video Demo Here!](https://youtu.be/JhO5IplBRrA)

**Roster / Roles:**

- Emory Walsh
  - Project Manager
  - Make changes to design doc
  - Whatever else is needed
- Benjamin Avrahami
  - Back end
  - Reading data and sending data to JS
- Jacob Olin
  - Front end
  - Creating the map
- Sophie Nichol
  - Front End
  - JS / D3 graphs

## Website Description:
The Happiness Project is a website dedicated to analyzing the data from the 2016 World Happiness Report to discuss and access the happiness in every country. One can view the data about individual countries, or they can view and compare data between different regions of the world.

## Launch Code:

**Cloning**

First, procure the ability to run Git commands.

- On Windows: Install [Git Bash](https://github.com/git-for-windows/git/releases/download/v2.24.0.windows.2/Git-2.24.0.2-64-bit.exe).

- On macOS: Use the [git-osx-installer](https://sourceforge.net/projects/git-osx-installer/files/git-2.23.0-intel-universal-mavericks.dmg/download?use_mirror=autoselect). If you have XCode installed on your machine, you may already have Git functionality.

- On Linux (preferably an Ubuntu based distribution): You already have Git!

Now, you can clone this repo. To do so, type into a terminal session:
```bash
git clone https://github.com/EmoryWalsh/softdevP4.git
```

The project repo should then clone into whatever folder you ran the clone command in.

**Dependencies**

You must install the pip modules listed in the /doc/requirements.txt file. To do so, install them in a Terminal with:
```bash
pip install -r <location of requirements.txt file>
```

The -r flag is necessary to distinguish it from a typical pip install. Without the -r, pip will look for a package online called "requirements.txt". That is obviously not desirable.

Note that on certain systems (like the school computers), the pip command may be restricted. To get around this, create a virtual environment with:
```bash
python3 -m venv <name_of_venv>
```
*Note that if your system only has Python 3 installed, just remove the 3 from the above command.*

To activate the virtual environment, cd into the directory you created the environment in, and run the "activate" file. Now, you should be able to pip install the requirements. To deactivate the environment, run the "deactivate" file.  

**Run the program**

After installing the required dependencies, all you need to do to run the program is to type into a terminal session:
```bash
cd app
python3 __init__.py
```
A*gain, remove the 3 after the "python" if necessary.*
