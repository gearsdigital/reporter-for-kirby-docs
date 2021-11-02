<template>
  <div data-theme="positive" class="note">
    <p>
      Your report has been created.
      <a v-if="message.issueUrl" :href="message.issueUrl" target="_blank"
        >#{{ message.issueId }}</a
      >
    </p>
    <button @click="$emit('dismiss')">dismiss</button>
  </div>
</template>
<script>
export default {
  name: "Notification",
  props: ["message"]
};
</script>
<style scoped lang="scss">
.note {
  display: flex;
  border-left: 2px solid #a7bd68;
  background: #c6d494;
  margin-bottom: 1rem;
  padding: 0 0.25rem;
  width: 100%;

  a,
  button {
    padding: 0;
    display: inline-block;
    margin-left: auto;
    transition: all 170ms ease-in-out;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      border-bottom: 1px dashed;
      left: 0;
      bottom: 2px;
    }

    &:hover {
      color: #265975;
    }
  }

  p {
    margin: 0;
    padding: 0;
  }

  button {
    line-height: inherit;
    border: 0;
    color: #292f17;
    background: 0 0;
    cursor: pointer;
    margin-left: auto;
  }
}
</style>
