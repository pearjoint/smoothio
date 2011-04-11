
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.ServiceProcess;
using System.Text;

namespace SmoothioDaemon {

	public partial class SmoothioDaemon : ServiceBase {

		public SmoothioDaemon () {
			InitializeComponent ();
		}

		protected override void OnStart (string [] args) {
		}

		protected override void OnStop () {
		}

	}

}
