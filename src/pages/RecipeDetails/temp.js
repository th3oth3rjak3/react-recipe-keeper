<!-- Recipe Ingredients Area -->
<div class="accordion-item">
  <h2 class="accordion-header" id="Ingredients">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#ingredients-panel"
      aria-expanded="false"
      aria-controls="ingredients-panel"
    >
      Ingredients
    </button>
  </h2>
  <div
    id="ingredients-panel"
    class="accordion-collapse collapse"
    aria-labelledby="Ingredients"
  >
    <div class="accordion-body">
      <!-- View-Only Ingredient Details -->
      <div class="col-lg" [hidden]="editing">
        <div
          class="row"
          *ngFor="let ingredient of ingredientList; let i = index"
          [hidden]="editing"
        >
          <div class="col-lg mb-3">
            <button
              type="button"
              class="btn btn-success shown ingredient-button-{{ i }}"
              [ngStyle]="{}"
              [hidden]="editing"
              (click)="toggleStrikethrough('ingredient', i)"
              title="button"
            >
              &check;
            </button>
            <button
              type="button"
              class="btn btn-danger hidden ingredient-button-undo-{{ i }}"
              [hidden]="editing"
              (click)="toggleStrikethrough('ingredient', i)"
              title="button"
            >
              &#x2715;
            </button>
            <span
              class="ingredient-li-{{ i }}"
              [hidden]="editing"
              position="i"
              >{{
                ingredientList[i].count !== null
                  ? ingredientList[i].count +
                    (ingredientList[i].volume !== null ? " - " : "")
                  : ""
              }}
              {{
                ingredientList[i].volume !== null
                  ? ingredientList[i].volume
                  : ""
              }}
              {{
                ingredientList[i].units !== null
                  ? ingredientList[i].units +
                    (ingredientList[i].volume === 1 ||
                    ingredientList[i].count !== null
                      ? ""
                      : "s")
                  : ""
              }}
              {{
                ingredientList[i].container !== null
                  ? ingredientList[i].container
                  : ""
              }}
              {{
                ingredientList[i].ingredient !== null
                  ? ingredientList[i].ingredient
                  : ""
              }}</span
            >
          </div>
        </div>
      </div>

      <!-- Editing Ingredients Area -->
      <div formArrayName="recipeIngredients">
        <div
          class="row"
          *ngFor="let item of ingredients.controls; let i = index"
          [hidden]="viewing"
        >
          <ng-container formGroupName="{{ i }}">
            <div class="col-lg mb-3" [hidden]="viewing">
              <label
                for="count"
                *ngIf="i === 0"
                class="form-label"
                [hidden]="viewing"
                >Count</label
              >
              <input
                class="form-control"
                type="number"
                formControlName="count"
                id="count"
                title="Number of items (e.g. 1 for 1 Tomato)"
                placeholder="Number of Objects"
                [hidden]="viewing"
              />
            </div>
            <div class="col-lg mb-3" [hidden]="viewing">
              <label
                class="form-label"
                *ngIf="i === 0"
                for="volume"
                [hidden]="viewing"
                >Volume</label
              >
              <input
                id="volume"
                type="number"
                class="form-control"
                formControlName="volume"
                placeholder="Numeric Measurement"
                title="Amount of measurement (e.g. 2 for 2 ounces)"
                [hidden]="viewing"
              />
              <div [hidden]="viewing">
                <small
                  *ngIf="ingredients['controls'][i].get('volume')?.invalid"
                  [hidden]="viewing"
                >
                  Volume is a required field when units are selected.
                </small>
              </div>
            </div>
            <div class="col-lg mb-3" [hidden]="viewing">
              <label
                class="form-label"
                *ngIf="i === 0"
                for="units"
                [hidden]="viewing"
                >Units</label
              >

              <select
                [ngClass]="makeUnitsSelectGray(i)"
                id="units"
                formControlName="units"
                title="Units of measure
                (e.g. ounces)"
                [hidden]="viewing"
              >
                <option [ngValue]="null" [hidden]="viewing">
                  Unit of Measure
                </option>
                <option
                  *ngFor="let unit of volumeUnitOptions"
                  [ngValue]="unit.val"
                  [hidden]="viewing"
                >
                  {{
                    ingredients.at(i).get("volume")?.value === 1 ||
                    ingredients.at(i).get("count")?.value !== null
                      ? unit.val
                      : unit.val + "s"
                  }}
                </option>
              </select>
              <div [hidden]="viewing">
                <small
                  *ngIf="ingredients['controls'][i].get('units')?.invalid"
                  [hidden]="viewing"
                >
                  Units are a required field when volume is not empty.
                </small>
              </div>
            </div>
            <div class="col-lg mb-3" [hidden]="viewing">
              <label
                class="form-label"
                *ngIf="i === 0"
                for="container"
                [hidden]="viewing"
                >Container</label
              >
              <input
                class="form-control"
                id="container"
                formControlName="container"
                placeholder="Container"
                title="The container (e.g. Jar for 1 Jar of Pickles)"
                [hidden]="viewing"
              />
            </div>
            <div class="col-lg mb-3" [hidden]="viewing">
              <label
                class="form-label"
                *ngIf="i === 0"
                for="ingredient"
                [hidden]="viewing"
                >Ingredient</label
              >
              <input
                id="ingredient"
                class="form-control"
                formControlName="ingredient"
                placeholder="Ingredient"
                title="The Ingredient (e.g. Pickles)"
                [hidden]="viewing"
              />
            </div>
            <div class="col-lg-2 mb-3 align-self-end" [hidden]="viewing">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                [attr.data-bs-target]="'#deleteIngredient-' + i"
                [hidden]="viewing"
              >
                Delete
              </button>
            </div>
            <div
              class="modal fade"
              [attr.id]="'deleteIngredient-' + i"
              tabindex="-1"
              [attr.aria-labelledby]="'deleteIngredientLabel-' + i"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title"
                      [attr.id]="'deleteIngredientLabel-' + i"
                    >
                      Delete Ingredient?
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>Are you sure you wish to delete this ingredient?</p>
                    <div class="row">
                      <div class="col-2">
                        <span class="underline bold">Count</span><br />
                        {{ ingredients["controls"][i].get("count")?.value }}
                      </div>
                      <div class="col-2">
                        <span class="underline bold">Volume</span><br />
                        {{
                          ingredients["controls"][i].get("volume")?.value
                        }}
                      </div>
                      <div class="col-2">
                        <span class="underline bold">Units</span><br />
                        {{ ingredients["controls"][i].get("units")?.value }}
                      </div>
                      <div class="col-2">
                        <span class="underline bold">Container</span><br />
                        {{
                          ingredients["controls"][i].get("container")?.value
                        }}
                      </div>
                      <div class="col">
                        <span class="underline bold">Ingredient</span><br />
                        {{
                          ingredients["controls"][i].get("ingredient")
                            ?.value
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                      (click)="deleteIngredient(i)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <div class="row" [hidden]="viewing">
        <div class="col-lg mt-3" [hidden]="viewing">
          <input
            type="button"
            class="btn btn-primary"
            value="Add New Ingredient"
            (click)="addIngredient()"
            [hidden]="viewing"
          />
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Recipe Ingredients Area -->

<!-- Recipe Instructions Area -->
<div class="accordion-item">
  <h2 class="accordion-header" id="Instructions">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#instructions-panel"
      aria-expanded="false"
      aria-controls="instructions-panel"
    >
      Instructions
    </button>
  </h2>
  <div
    id="instructions-panel"
    class="accordion-collapse collapse"
    aria-labelledby="Instructions"
  >
    <div class="accordion-body">
      <!-- View-Only Instructions Area -->
      <div class="col-lg" [hidden]="editing">
        <div
          class="row"
          *ngFor="let instruction of instructionList; let i = index"
          [hidden]="editing"
        >
          <div class="col-lg mb-3">
            <button
              type="button"
              class="btn btn-success shown instruction-button-{{ i }}"
              [hidden]="editing"
              (click)="toggleStrikethrough('instruction', i)"
              title="button"
            >
              &check;
            </button>
            <button
              type="button"
              class="btn btn-danger hidden instruction-button-undo-{{ i }}"
              [hidden]="editing"
              (click)="toggleStrikethrough('instruction', i)"
              title="button"
            >
              &#x2715;
            </button>
            <span
              class="instruction-li-{{ i }}"
              [hidden]="editing"
              position="i"
              >{{ instructionList[i].step + "." }}
              {{ instructionList[i].instruction }}</span
            >
          </div>
        </div>
      </div>

      <!-- Editing Instructions Area -->
      <div formArrayName="recipeInstructions">
        <div
          class="row"
          *ngFor="let item of instructions.controls; let i = index"
          [hidden]="viewing"
        >
          <ng-container formGroupName="{{ i }}">
            <div class="col-lg-2 mb-3" [hidden]="viewing">
              <label
                for="step"
                *ngIf="i === 0"
                class="form-label"
                [hidden]="viewing"
                >Step</label
              >
              <input
                class="form-control"
                type="number"
                formControlName="step"
                id="step"
                title="The step number of the instructions. (e.g. Step 1)"
                placeholder="Step #"
                readonly
                [hidden]="viewing"
              />
            </div>
            <div class="col-lg-8 mb-3" [hidden]="viewing">
              <label
                class="form-label"
                *ngIf="i === 0"
                for="instruction"
                [hidden]="viewing"
                >Instruction</label
              >
              <input
                id="instruction"
                class="form-control"
                formControlName="instruction"
                placeholder="Instruction Details"
                title="The instruction details (e.g. Preaheat Oven)"
                [hidden]="viewing"
              />
            </div>
            <div class="col-lg-2 mb-3 align-self-end" [hidden]="viewing">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                [attr.data-bs-target]="'#deleteInstruction-' + i"
                [hidden]="viewing"
              >
                Delete
              </button>
            </div>
            <div
              class="modal fade"
              [attr.id]="'deleteInstruction-' + i"
              tabindex="-1"
              [attr.aria-labelledby]="'deleteInstructionLabel-' + i"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title"
                      [attr.id]="'deleteInstructionLabel-' + i"
                    >
                      Delete Instruction?
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>Are you sure you wish to delete this instruction?</p>
                    <div class="row">
                      <div class="col-1">
                        <span class="underline bold">Step</span><br />
                        {{ instructions["controls"][i].get("step")?.value }}
                      </div>
                      <div class="col">
                        <span class="underline bold">Instruction</span
                        ><br />
                        {{
                          instructions["controls"][i].get("instruction")
                            ?.value
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                      (click)="deleteInstruction(i)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <div class="row" [hidden]="viewing">
        <div class="col mt-3" [hidden]="viewing">
          <input
            type="button"
            class="btn btn-primary"
            value="Add New Instruction"
            (click)="addInstruction(instructions.length + 1)"
            [hidden]="viewing"
          />
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Recipe Instructions Area -->

<!-- Conversion Tools Area -->
<div class="accordion-item round-bottom">
  <h2 class="accordion-header" id="ConversionTools">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#conversions-panel"
      aria-expanded="false"
      aria-controls="conversions-panel"
      (click)="roundCorners(4)"
    >
      Conversion Tools
    </button>
  </h2>
  <div
    id="conversions-panel"
    class="accordion-collapse collapse"
    aria-labelledby="ConversionTools"
  >
    <div class="accordion-body">New Features Coming Soon!</div>
  </div>
</div>
<!-- Conversion Tools Area -->

<!-- Submit and Cancel Buttons -->
<div class="mt-3">
  <input
    type="button"
    class="btn btn-primary"
    value="Edit"
    [hidden]="editing"
    (click)="doEdits()"
  />
  <input
    type="button"
    class="btn btn-danger"
    value="Delete"
    [hidden]="editing"
    data-bs-toggle="modal"
    data-bs-target="#deleteConfirmation"
  />
  <button
    type="button"
    class="btn btn-primary"
    [disabled]="viewing"
    [hidden]="viewing"
    data-bs-toggle="modal"
    data-bs-target="#editSummary"
    (click)="getChanges()"
  >
    Update
  </button>
  <input
    type="button"
    class="btn btn-danger"
    value="Cancel"
    (click)="cancelEditing()"
    [hidden]="viewing"
  />

  <!-- Modal For Edit Summary of Changes -->
  <div
    class="modal fade"
    id="editSummary"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editSummaryLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editSummaryLabel">
            Summary of Changes
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Check for title changes -->
          <div class="row">
            <div
              class="col"
              *ngIf="editChanges.hasOwnProperty('titleFrom')"
            >
              <span class="bold underline">Title</span>
              <ul>
                <li>
                  <span class="bold underline">From</span
                  >{{ ": " + editChanges.titleFrom }}
                </li>
                <li>
                  <span class="bold underline">To</span
                  >{{ ": " + editChanges.titleTo }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Check For Author Changes -->
          <div class="row">
            <div
              class="col"
              *ngIf="editChanges.hasOwnProperty('authorFrom')"
            >
              <span class="bold underline">Author</span>
              <ul>
                <li>
                  <span class="bold underline">From</span
                  >{{ ": " + editChanges.authorFrom }}
                </li>
                <li>
                  <span class="bold underline">To</span
                  >{{ ": " + editChanges.authorTo }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Check For Difficulty Changes -->
          <div class="row">
            <div
              class="col"
              *ngIf="editChanges.hasOwnProperty('difficultyFrom')"
            >
              <span class="bold underline">Difficulty</span>
              <ul>
                <li>
                  <span class="bold underline">From</span
                  >{{ ": " + editChanges.difficultyFrom }}
                </li>
                <li>
                  <span class="bold underline">To</span
                  >{{ ": " + editChanges.difficultyTo }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Check For Time Amount Changes -->
          <div class="row">
            <div
              class="col"
              *ngIf="editChanges.hasOwnProperty('timeAmountFrom')"
            >
              <span class="bold underline">Time Amount</span>
              <ul>
                <li>
                  <span class="bold underline">From</span
                  >{{ ": " + editChanges.timeAmountFrom }}
                </li>
                <li>
                  <span class="bold underline">To</span
                  >{{ ": " + editChanges.timeAmountTo }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Check For Time Unit Changes -->
          <div class="row">
            <div
              class="col"
              *ngIf="editChanges.hasOwnProperty('timeUnitsFrom')"
            >
              <span class="bold underline">Time Units</span>
              <ul>
                <li>
                  <span class="bold underline">From</span
                  >{{
                    ": " +
                      editChanges.timeUnitsFrom +
                      (details.recipeAdminDetails.timeAmount === 1
                        ? ""
                        : "s")
                  }}
                </li>
                <li>
                  <span class="bold underline">To</span
                  >{{
                    ": " +
                      editChanges.timeUnitsTo +
                      (adminDetails["controls"]["timeAmount"]?.value === 1
                        ? ""
                        : "s")
                  }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Check For Ingredient Changes -->
          <div
            class="row"
            *ngFor="let change of editChanges['ingredients']; let i = index"
          >
            <span class="bold underline"
              >Ingredient {{ change.ingredientNumber + 1 }}</span
            >

            <!-- Ingredient Count Changes -->
            <div class="row">
              <div class="col" *ngIf="change.hasOwnProperty('countFrom')">
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="bold underline"
                  >Count</span
                >
                <ul>
                  <li>
                    <span class="bold underline"> From</span
                    >{{ ": " + change.countFrom }}
                  </li>
                  <li>
                    <span class="bold underline">To</span
                    >{{ ": " + change.countTo }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Ingredient Volume Changes -->
            <div class="row">
              <div class="col" *ngIf="change.hasOwnProperty('volumeFrom')">
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="bold underline"
                  >Volume</span
                >
                <ul>
                  <li>
                    <span class="bold underline">From</span
                    >{{ ": " + change.volumeFrom }}
                  </li>
                  <li>
                    <span class="bold underline">To</span
                    >{{ ": " + change.volumeTo }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Ingredient Unit Changes -->
            <div class="row">
              <div class="col" *ngIf="change.hasOwnProperty('unitsFrom')">
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="bold underline"
                  >Units</span
                >
                <ul>
                  <li>
                    <span class="bold underline">From</span
                    >{{
                      ": " +
                        (change.unitsFrom === ""
                          ? ""
                          : change.unitsFrom +
                            (details.recipeIngredients[i].count !== null ||
                            details.recipeIngredients[i].volume === 1 ||
                            change.unitsFrom === ""
                              ? ""
                              : "s"))
                    }}
                  </li>
                  <li>
                    <span class="bold underline">To</span
                    >{{
                      ": " +
                        change.unitsTo +
                        (ingredients["controls"][i]?.get("count")?.value !==
                          null ||
                        ingredients["controls"][i]?.get("volume")?.value ===
                          1 ||
                        change.unitsTo === ""
                          ? ""
                          : "s")
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- Ingredient Container Changes -->
            <div class="row">
              <div
                class="col"
                *ngIf="change.hasOwnProperty('containerFrom')"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="bold underline"
                  >Container</span
                >
                <ul>
                  <li>
                    <span class="bold underline">From</span
                    >{{ ": " + change.containerFrom }}
                  </li>
                  <li>
                    <span class="bold underline">To</span
                    >{{ ": " + change.containerTo }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- Ingredient Description Changes -->
            <div class="row">
              <div
                class="col"
                *ngIf="change.hasOwnProperty('ingredientFrom')"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="bold underline"
                  >Ingredient Description</span
                >
                <ul>
                  <li>
                    <span class="bold underline">From</span
                    >{{ ": " + change.ingredientFrom }}
                  </li>
                  <li>
                    <span class="bold underline">To</span
                    >{{ ": " + change.ingredientTo }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Check For Instruction Changes -->
          <div
            class="row"
            *ngFor="
              let change of editChanges['instructions'];
              let i = index
            "
          >
            <span class="bold underline"
              >Instruction {{ change.instructionNumber + 1 }}</span
            >

            <!-- Instruction Description Changes -->
            <div class="row">
              <div
                class="col"
                *ngIf="change.hasOwnProperty('instructionFrom')"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="bold underline"
                  >Instruction Description</span
                >
                <ul>
                  <li>
                    <span class="bold underline"> From</span
                    >{{ ": " + change.instructionFrom }}
                  </li>
                  <li>
                    <span class="bold underline">To</span
                    >{{ ": " + change.instructionTo }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Go Back
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            (click)="onSubmit()"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Edit Summary Modal -->
  <!-- Begin Delete Confirmation Modal -->
  <div
    class="modal fade"
    id="deleteConfirmation"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="deleteConfirmationLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteConfirmationLabel">
            Delete Recipe?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete '{{ recipeTitle }}'?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            (click)="deleteRecipe()"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</form>
</div>