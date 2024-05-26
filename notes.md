# notes

- dnd kit
    - uses refs
    - refs point to id of a DOM element
    - we want to be able to drag the table cell
        - table cell has a unique key
        - mirror key as id
- game actions
    - drag bird name from the bird bank over to the board
        - if correct, image on board has green overlay
        - if wrong, have brief red overlay
        - or a "incorrect" message or animation or something
    - once correct, can't move bird
        - so droppable is no longer draggable
    - only so many attempts to drag and drop
        - so you can't just drag a bird to every square