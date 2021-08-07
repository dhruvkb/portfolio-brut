<template>
  <div class="contact">
    <h2 class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1 mb-2">
      <span class="pane-element-right-safe">Contact</span>
    </h2>
    <div class="pane-element-right-safe">
      <table>
        <thead class="hidden">
          <tr>
            <th>Site</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(site, index) in sites"
            :key="index">
            <td class="contact-cell header">{{ site.name }}</td>
            <td class="contact-cell text-lg">
              <a
                :href="site.url"
                target="_blank">
                {{ site.text }}
                <span class="text-xs font-bold text-sol-r">&UpperRightArrow;</span>
              </a>
            </td>
          </tr>
          <tr>
            <td class="contact-cell header">Email</td>
            <td class="contact-cell text-lg">
              <span class="secret" data-a="ih" data-b="bkvurhd" data-c="ved"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Contact',
    setup() {
      return {
        sites: [
          {
            name: 'LinkedIn',
            text: 'in/dhruvkb',
            url: 'https://www.linkedin.com/in/dhruvkb',
          },
          {
            name: 'GitHub',
            text: '@dhruvkb',
            url: 'https://github.com/dhruvkb',
          },
        ],
      }
    },
  })
</script>

<style scoped lang="css">
  .contact-cell {
    vertical-align: baseline;

    @apply py-1;

    &.header {
      @apply text-right text-xs text-sol-1 font-medium uppercase pr-4;
    }
  }

  .secret::after {
    content: attr(data-c) "\002e" attr(data-b) "\0040" attr(data-a);
    unicode-bidi: bidi-override;
    direction: rtl;
  }
</style>
