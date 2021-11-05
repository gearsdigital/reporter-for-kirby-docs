<template>
  <div class="report-view">
    <header>
      <h3 class="header--headline">Create Report</h3>
      <a href="./guide/#playground">What is this?</a>
    </header>

    <Notification
        :message="message"
        v-if="message"
        v-on:dismiss="hideNotification"
    />

    <p>File a bug or submit a feature you want to discuss.</p>

    <form
        class="report-view--form"
        method="POST"
        @submit="checkForm"
        autocomplete="off"
    >
      <div class="report-view--field">
        <label for="title"
        >Title <abbr title="The field is required">*</abbr></label
        >
        <input
            id="title"
            v-model.trim="title"
            autocomplete="off"
            name="title"
            required="required"
            type="text"
        />
      </div>

      <tabs :options="{ useUrlFragment: false }" @changed="tabChanged">
        <tab name="Write">
          <div class="report-view--field">
            <textarea v-model.trim="preview"></textarea>
            <div class="help">
              <span>
                <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    data-view-component="true"
                >
                  <path
                      fill="#777"
                      d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                  ></path>
                </svg>
                Github flavoured markdown supported
              </span>
<!--               <a href="">Learn more</a>-->
            </div>
          </div>
        </tab>
        <tab name="Preview">
          <div role="textbox" class="report-view--preview">
            {{ previewEnhanced }}
          </div>
        </tab>
      </tabs>

      <button class="report-view--submit" type="submit" :disabled="loading">
        <span aria-hidden="true" class="report-view--icon">
          <svg viewBox="0 0 16 16" v-if="!loading">
            <path
                d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
            ></path>
            <path d="M7 11.414L3.586 8 5 6.586l2 2 4-4L12.414 6z"></path>
          </svg>

          <svg
              v-if="loading"
              width="16px"
              height="16px"
              viewBox="0 0 50 50"
              xml:space="preserve"
          >
            <path
                stroke="#418AB2"
                stroke-width="3"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            >
              <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
              />
            </path>
          </svg>
        </span>
        <span class="report-view--submit-text">Submit</span>
      </button>
    </form>
  </div>
</template>

<script>
import {Tab, Tabs} from "vue3-tabs-component";
import Notification from "./Notification";

export default {
  name: "ReporterForm",
  components: {Notification, Tabs, Tab},
  data() {
    return {
      title: null,
      preview: null,
      message: "",
      loading: false
    };
  },
  computed: {
    previewEnhanced() {
      return `# Issue Template\n\nThis preview could contain some basic information, for example the active user.\n\n${this
          .preview ?? ""}`;
    }
  },
  methods: {
    tabChanged(selectedTab) {
      selectedTab.tab.name;
    },
    hideNotification() {
      this.message = null;
    },
    async checkForm(evt) {
      evt.preventDefault();

      if (!this.title) {
        return;
      }

      let description = "";
      if (this.preview) {
        description = this.previewEnhanced;
      }

      this.loading = true;

      setTimeout(() => {
        this.message = {issueUrl: 'https://example.com/repo/issue/21', status: 201, issueId: "21"};
        this.title = null;
        this.preview = null;
        this.loading = false;
      }, 2000)
    }
  }
};
</script>

<style scoped lang="scss">
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
  Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.report-view {
  position: relative;
  background: #efefef;
  padding: 1.35rem 1.75rem;
  font-size: 14px;
  line-height: 18px;

  p {
    line-height: 18px;
  }

  header {
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: baseline;

    a {
      margin-left: auto;
      font-size: 0.75rem;
    }
  }

  .header--headline {
    font-size: 1.25rem;
    line-height: 1.15em;
    min-height: 1.25em;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
  }

  header + p {
    margin-bottom: 1.25rem;
  }

  // hide text if a notification is present
  header + .note + p {
    display: none;
  }

  &--form {
    background: #fafafa;
    border: 1px solid #e1e1e1;
    padding: 1.5rem;
  }

  &--field {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    input {
      padding: 0.5rem;
    }

    textarea {
      padding: 0.25rem 0.5rem;
      line-height: 1.5rem;
      min-height: 130px;
      resize: none;
    }

    textarea,
    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 3px;
      width: 100%;
      font: inherit;

      &:focus {
        outline: none;
        border: 1px solid rgba(113, 143, 183, 1);
        box-shadow: rgba(113, 143, 183, 0.25) 0 0 0 2px;
      }
    }

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.25rem;

      abbr {
        padding-left: 0.25rem;
        text-decoration: none;
        color: #999;
      }
    }
  }

  &--preview {
    white-space: pre-wrap;
  }

  &--submit {
    box-sizing: border-box;
    line-height: inherit;
    border: 0;
    background: none;
    cursor: pointer;
    display: flex;
    position: relative;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: opacity 0.3s;
    margin: 0 0 0 auto;

    &:disabled {
      opacity: 0.5;
    }

    &:hover {
      color: #418ab2;

      .report-view--icon svg {
        fill: #418ab2;
      }
    }
  }

  &--icon {
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    justify-content: center;
    display: inline-flex;
    align-items: center;
    line-height: 0;
    opacity: 1;
    vertical-align: middle;
    top: 1px;

    svg {
      cursor: pointer;
      box-sizing: border-box;

      width: 1rem;
      height: 1rem;
    }
  }

  &--submit-text {
    margin-left: 0.5rem;
  }

  .help {
    display: flex;
    font-size: 0.75rem;
    padding-top: 0.25rem;
    line-height: 1.25rem;

    span {
      color: #777;
      display: flex;
      align-items: center;

      svg {
        margin-right: 0.25rem;
      }
    }
  }

  a {
    margin-left: auto;
    transition: all 170ms ease-in-out;
    position: relative;

    &:after {
      transition: all 170ms ease-in-out;
      content: "";
      position: absolute;
      width: 100%;
      border-bottom: 1px dashed;
      left: 0;
      bottom: 1px;
      opacity: 0.3;
    }

    &:hover {
      color: #265975;

      &:after {
        opacity: 0.5;
      }
    }
  }
}

:deep(.tabs-component-tabs) {
  padding: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  margin: 0 0 -1px;
  line-height: 16px;
  list-style: none;
}

:deep(.tabs-component-tab-a) {
  display: block;
  cursor: pointer;
  padding: 0.7rem 1rem 0.5rem;
  color: #737578;
  position: relative;
  margin-bottom: -1px;
}

:deep(.tabs-component-tab-a.is-active) {
  color: #16171a;
  background: #fafafa;
}

:deep(.tabs-component-tab-a.is-active:after) {
  position: absolute;
  content: "";
  left: 0;
  top: -1px;
  width: calc(100% - 2px);
  height: 100%;
  border-radius: 4px 4px 0 0;
  border: 1px solid #ccc;
  border-bottom: 0;
}

:deep(.tabs-component-panels) {
  min-height: 175px;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
}
</style>
