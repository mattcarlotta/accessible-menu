import KeyIcon from '../KeyIcon'

export default function Instructions() {
  return (
    <div className="bg-gray bg-opacity-30 p-4 my-2 space-y-4">
      <div>
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
        to navigate across the collapsible menus.
      </div>
      <div>
        <strong>When a menu is closed:</strong>
        <ul className="list-disc pl-6">
          <li>
            Press
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
            to <strong>open</strong> the menu and focus on the&nbsp;
            <strong>last</strong> menu item.
          </li>
          <li>
            Or press&nbsp;
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
            to <strong>open</strong> the menu and focus on the&nbsp;
            <strong>first</strong> menu item.
          </li>
          <li>
            Or press
            <KeyIcon height="4em" width="4em">
              Enter
            </KeyIcon>
            or
            <KeyIcon height="4em" width="4em">
              Space
            </KeyIcon>
            (or left mouse click) to <strong>open</strong> and&nbsp;
            <strong>close</strong> the menu.
          </li>
        </ul>
      </div>
      <div>
        <strong>When a menu is opened:</strong>
        <ul className="list-disc pl-6">
          <li>
            Press the&nbsp;
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
            arrow keys to navigate <strong>up</strong> or <strong>down</strong>
            &nbsp;the the menu items.
          </li>
          <li>
            Press
            <KeyIcon height="4em" width="4em">
              Enter
            </KeyIcon>
            (or left mouse click) to <strong>select</strong> a menu item.
          </li>
          <li>
            Press
            <KeyIcon height="4em" width="4em">
              Esc
            </KeyIcon>
            (or left mouse click on the menu title) to <strong>close</strong>
            &nbsp;the menu.
          </li>
        </ul>
      </div>
    </div>
  )
}
