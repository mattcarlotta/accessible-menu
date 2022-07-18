import KeyIcon from '../KeyIcon'

export default function Instructions() {
  return (
    <div className="bg-gray bg-opacity-30 p-2 my-8">
      <p>
        Press&nbsp;
        <KeyIcon height="4em" width="4em">
          Tab
        </KeyIcon>
        and/or
        <KeyIcon height="4em" width="4em">
          Shift
        </KeyIcon>
        <span className="font-bold font-5xl">+</span>
        <KeyIcon height="4em" width="4em">
          Tab
        </KeyIcon>
        to navigate to one of the collapsible menus below.
      </p>
      <p>
        Press
        <KeyIcon height="4em" width="4em">
          Enter
        </KeyIcon>
        (or left mouse click) to open and close the menu.
      </p>
      <p>
        When a menu is opened, press the&nbsp;
        <KeyIcon
          x="68"
          y="46"
          fontSize="1.4rem"
          rotate="-90"
          height="4em"
          width="4em"
        >
          &#10148;
        </KeyIcon>
        and
        <KeyIcon
          x="54"
          y="26"
          fontSize="1.4rem"
          rotate="90"
          height="4em"
          width="4em"
        >
          &#10148;
        </KeyIcon>
        arrow keys to navigate the links.
      </p>
      <p>
        Press
        <KeyIcon height="4em" width="4em">
          Enter
        </KeyIcon>
        (or left mouse click) to select a link <strong>OR</strong> press
        <KeyIcon height="4em" width="4em">
          Esc
        </KeyIcon>
        (or left mouse click) to close the menu.
      </p>
    </div>
  )
}
