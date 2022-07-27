<div class="form-group row" formGroupName="recipeAdminDetails">
            <div class="col-lg mb-3" [hidden]="viewing">
              <label for="recipe-title" class="form-label" [hidden]="viewing"
                >Recipe Title</label
              >
              <input
                type="text"
                id="recipeTitle"
                formControlName="recipeTitle"
                class="form-control"
                placeholder="Enter Recipe Title"
                title="The Name of the Recipe"
              />
              <div [hidden]="viewing">
                <small
                  *ngIf="
                    adminDetails.get('recipeTitle')?.invalid &&
                    adminDetails.get('recipeTitle')?.touched
                  "
                  [hidden]="viewing"
                >
                  Recipe Title is a required field.
                </small>
              </div>
            </div>

            <div class="col-lg mb-3" [hidden]="viewing">
              <label for="author" class="form-label" [hidden]="viewing"
                >Author</label
              >
              <input
                type="text"
                id="author"
                formControlName="author"
                class="form-control"
                placeholder="Enter Author Name"
                title="The Recipe Author's Name"
                [hidden]="viewing"
              />
              <div [hidden]="viewing">
                <small
                  *ngIf="
                    adminDetails.get('author')?.invalid &&
                    adminDetails.get('author')?.touched
                  "
                  [hidden]="viewing"
                >
                  Author is a required field.
                </small>
              </div>
            </div>

            <div class="col-lg mb-3" [hidden]="viewing">
              <label for="difficulty" class="form-label" [hidden]="viewing"
                >Difficulty</label
              >
              <select
                id="difficulty"
                class="form-select"
                formControlName="difficulty"
                title="How difficult is the recipe to make?"
                [hidden]="viewing"
              >
                <option [ngValue]="null" disabled [hidden]="viewing">
                  Select a difficulty
                </option>
                <option
                  *ngFor="let diff of difficultyOptions"
                  [ngValue]="diff.val"
                  [hidden]="viewing"
                >
                  {{ diff.val }}
                </option>
              </select>
              <div [hidden]="viewing">
                <small
                  *ngIf="
                    adminDetails.get('difficulty')?.invalid &&
                    adminDetails.get('difficulty')?.touched
                  "
                  [hidden]="viewing"
                >
                  Difficulty is a required field.
                </small>
              </div>
            </div>

            <div class="col-lg mb-3" [hidden]="viewing">
              <label for="timeAmount" class="form-label" [hidden]="viewing"
                >Time Amount</label
              >
              <input
                type="number"
                class="form-control"
                id="timeAmount"
                formControlName="timeAmount"
                placeholder="Numeric Time Value"
                title="The amount of time it takes to make the recipe (e.g. 10)"
                [hidden]="viewing"
              />
              <div [hidden]="viewing">
                <small
                  *ngIf="
                    adminDetails.get('timeAmount')?.invalid &&
                    adminDetails.get('timeAmount')?.touched
                  "
                  [hidden]="viewing"
                >
                  Time Amount is a required field.
                </small>
              </div>
            </div>

            <div class="col-lg mb-3" [hidden]="viewing">
              <label for="time-units" class="form-label" [hidden]="viewing"
                >Time Units</label
              >
              <select
                id="timeUnits"
                formControlName="timeUnits"
                class="form-select"
                title="The units of time the recipe will take to make (e.g. Hours)"
                [hidden]="viewing"
              >
                <option [ngValue]="null" disabled [hidden]="viewing">
                  Select Time Units
                </option>
                <option
                  *ngFor="let time of timeUnitOptions"
                  [ngValue]="time.val"
                  [hidden]="viewing"
                >
                  {{
                    adminDetails.get("timeAmount")?.value === 1
                      ? time.val
                      : time.val + "s"
                  }}
                </option>
              </select>
              <div [hidden]="viewing">
                <small
                  *ngIf="
                    adminDetails.get('timeUnits')?.invalid &&
                    adminDetails.get('timeUnits')?.touched
                  "
                  [hidden]="viewing"
                >
                  Time Units is a required field.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>