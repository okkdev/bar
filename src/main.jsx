const refreshFrequency = 5000 // ms

const command = `
BATTERY=$(bash bar/scripts/battery.sh)
TIME=$(date +"%H:%M")
DATE=$(date +"%a, %b %d")
SPOTIFY=$(osascript bar/scripts/spotify.scpt)

echo $(cat <<-EOF
{
  "battery": "$BATTERY",
  "time": "$TIME",
  "date": "$DATE",
  "spotify": "$SPOTIFY"
}
EOF
)
`

const initialState = {
  output: {
    battery: "Loading",
    time: "00:00",
    date: "Loading",
    spotify: "",
  },
}

const updateState = (event, previousState) => {
  try {
    return { output: JSON.parse(event.output) }
  } catch (err) {
    return previousState
  }
}

const render = ({ output }) => {
  return (
    <div className="w-screen">
      <link href="bar/style.css" type="text/css" rel="stylesheet" />
      <div className="flex justify-between gate">
        <div></div>
        <div className="flex gap-2">
          {output.spotify ? <div className="blob">♫ {output.spotify}</div> : ""}
          <div className="blob">→ {output.date}</div>
          <div className="blob">☀ {output.time}</div>
          <div className="blob">{output.battery}</div>
        </div>
      </div>
    </div>
  )
}

export { refreshFrequency, command, initialState, updateState, render }
